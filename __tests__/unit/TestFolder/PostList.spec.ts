import { mount, flushPromises } from "@vue/test-utils";
//import axios from "axios";
import PostList from "../../../src/components/TestFolder/PostList.vue";

const mockPostList = [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
];

jest.mock("axios", () => ({
  get: jest.fn(() => {
    console.log("------------>333");
    return mockPostList;
  }),
}));

/*
test("loads posts on button click", async () => {
  const wrapper = mount(PostList);

  await wrapper.get("button").trigger("click");

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith("/api/posts");

  await flushPromises();

  const posts = wrapper.findAll('[data-test="post"]');

  expect(posts).toHaveLength(2);
  expect(posts[0].text()).toContain("title1");
  expect(posts[1].text()).toContain("title2");
});
*/

test("displays loading state on button click", async () => {
  const wrapper = mount(PostList);

  expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  expect(wrapper.get("button").attributes()).not.toHaveProperty("disabled");

  console.log("------------>111");
  await wrapper.get("button").trigger("click");
  console.log("------------>444");

  expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  expect(wrapper.get("button").attributes()).toHaveProperty("disabled");

  await flushPromises();

  expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  expect(wrapper.get("button").attributes()).not.toHaveProperty("disabled");
});
