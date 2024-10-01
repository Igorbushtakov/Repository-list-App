import {mount} from '@vue/test-utils';
import RepositoriesList from '@/components/RepositoriesList.vue';
import {beforeEach, describe, it, vi} from 'vitest';


// Mock the API call
vi.mock('@/services/api/github', () => ({
    getRepositoriesList: vi.fn().mockResolvedValue({
        data: [{
            id: 1,
            name: 'repo1',
            description: 'Test repo',
            owner: {login: 'owner1'},
            has_wiki: true
        }]
    })
}));


const mockLongClickDirective = {
    beforeMount(el, binding) {
        el.addEventListener('pointerdown', () => {
            setTimeout(() => {
                binding.value();
            }, 500);
        });

        el.addEventListener('pointerup', () => {
        });
    },
    unmounted(el) {
        el.removeEventListener('pointerdown');
        el.removeEventListener('pointerup');
    },
};

describe('RepositoriesList.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(RepositoriesList, {
            global: {
                stubs: {
                    RepoLinksDialog: true,
                },
                directives: {
                    'long-click': mockLongClickDirective,
                },
            },
        });
    });

    it('render component without an errors', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('renders repositories after fetching data', async () => {
        const repos = wrapper.findAll('li');
        expect(repos.length).toBe(1);
        expect(repos[0].text()).toContain('Name:repo1');
    });

    it('shows the dialog when a repo is clicked with a long click', async () => {
        const mockSelectedData = {
            id: 1,
            name: 'repo1',
            description: 'Test repo',
            owner: {login: 'owner1'},
            has_wiki: true
        }
        vi.useFakeTimers()
        await wrapper.find('li').trigger('pointerdown');
        expect(wrapper.vm.dialogVisible).toBe(false);
        expect(wrapper.vm.repoSelected).toEqual(null);
        await wrapper.vm.$nextTick();
        vi.advanceTimersByTime(600) // Wait for the timeout in the directive
        expect(wrapper.vm.dialogVisible).toBe(true);
        expect(wrapper.vm.repoSelected).toEqual(mockSelectedData);
    });

    it('calls loadMore when scrolled near bottom', async () => {
        vi.useFakeTimers()
        wrapper.vm.handleScroll = vi.fn(() => {
            // Scroll down simulation
            wrapper.vm.loadMore()
        });
        const loadMoreSpy = vi.spyOn(wrapper.vm, 'loadMore');
        const handleScrollSpy = vi.spyOn(wrapper.vm, 'handleScroll');
        // Default page number is 1
        expect(wrapper.vm.page).toEqual(1);
        const repoListWrapper = wrapper.find('.repositories-list-wrapper')
        repoListWrapper.trigger('scroll');
        vi.advanceTimersByTime(500)
        expect(handleScrollSpy).toHaveBeenCalled();
        expect(loadMoreSpy).toHaveBeenCalled();
        expect(wrapper.vm.page).toEqual(2);
    });

    it('opens a URL in a new tab when openUrl is called', () => {
        global.open = vi.fn();
        const testUrl = 'https://example.com';

        wrapper.vm.openUrl(testUrl);
        expect(global.open).toHaveBeenCalledWith(testUrl, '_blank');
    });
});
