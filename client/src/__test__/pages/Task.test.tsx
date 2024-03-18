import { Router } from "react-router5";
import Task from "../../pages/Task"
import { renderWithProviders } from "../store/customProvider/store-utills"
import { Route, RouterProvider, Routes, createMemoryRouter } from "react-router-dom";
import Layout from "../../Layout/Layout";

describe("task page testing", () => {
    it("should render page correctly", () => {
        const routes = [
            {
                path: "/task",
                element: <Layout  > <Task />  </Layout>,

            },]


        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/task"],
            initialIndex: 1,
        });


        const { getByRole, getByText, getByTestId } = renderWithProviders(
            <RouterProvider router={router} />
        );

        // checking the rederring sidebar in task page

        let sidebarHEader = getByText(/ariso technologies/i);
        let sidebarUserLink = getByRole('link', {
            name: /task/i
        })
        let sidebarSettingLink = getByRole('link', {
            name: /users/i
        })
        let sidebarTaskLink = getByRole('link', {
            name: /Settings/i
        })
        let sidebarLogoutButton = getByRole('button', {
            name: /logout/i
        })
        expect(sidebarHEader).toBeVisible();
        expect(sidebarTaskLink).toBeVisible();
        expect(sidebarUserLink).toBeVisible();
        expect(sidebarSettingLink).toBeVisible();
        expect(sidebarLogoutButton).toBeVisible();

        // checking the rederring navbar in task page

        let navbarAboutUs = getByRole('link', {
            name: /about us/i
        });
        expect(navbarAboutUs).toBeVisible();

        // cheking component renderring in task page

        const searchInput = getByRole('textbox');
        expect(searchInput).toBeVisible();

        let addButton = getByRole("button", { name: /ADD/i });
        expect(addButton).toBeVisible();

        let filterSvg = getByTestId('filter_svg');
        expect(filterSvg).toBeVisible()

        let taskNameColumn = getByRole('columnheader', {
            name: /task name/i
        });

        expect(taskNameColumn).toBeVisible();

        let taskDateColumn = getByRole('columnheader', {
            name: /task date/i
        });

        expect(taskDateColumn).toBeVisible();

        let taskStatusColumn = getByRole('columnheader', {
            name: /task status/i
        });

        expect(taskStatusColumn).toBeVisible();


        let previosButton = getByRole('button', {
            name: /previous/i
        })


        expect(previosButton).toBeVisible();

        let nextButton = getByRole('button', {
            name: /next/i
        });


        expect(nextButton).toBeVisible();


    })

    it("should corretly set tasks for render", () => {
        const routes = [
            {
                path: "/task",
                element: <Layout  > <Task />  </Layout>,

            },]


        const router = createMemoryRouter(routes, {
            initialEntries: ["/", "/task"],
            initialIndex: 1,
        });


        const { getByRole, getByText, getByTestId, queryAllByTestId, getAllByTestId } = renderWithProviders(
            <RouterProvider router={router} />, {
            preloadedState: {
                user: {
                    email: "",
                    token: "",
                    userId: ""
                },
                task: {
                    totalTask: [
                        {
                            date: "2024-02-03",
                            task_description: "task 1",
                            task_status: false,
                            _id: "65e5af7e71fbf1d8b053eec7",
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec8",
                            task_description: "task 2",
                            task_status: false,
                            date: "2024-04-03"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec9",
                            task_description: "task 3",
                            task_status: false,
                            date: "2024-04-06"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec10",
                            task_description: "task 4",
                            task_status: true,
                            date: "2024-02-10"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec11",
                            task_description: "task 5",
                            task_status: false,
                            date: "2024-02-03"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec12",
                            task_description: "task 6",
                            task_status: false,
                            date: "2024-04-03"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec13",
                            task_description: "task 7",
                            task_status: false,
                            date: "2024-04-06"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec14",
                            task_description: "task 8",
                            task_status: true,
                            date: "2024-02-10"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec15",
                            task_description: "task 9",
                            task_status: false,
                            date: "2024-02-03"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec16",
                            task_description: "task 10",
                            task_status: false,
                            date: "2024-04-03"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec17",
                            task_description: "task 11",
                            task_status: false,
                            date: "2024-04-06"
                        },
                        {
                            _id: "65e5af7e71fbf1d8b053eec18",
                            task_description: "task 12",
                            task_status: true,
                            date: "2024-02-10"
                        },
                    ],
                    filteredTask: [],
                    filterMessage: "",
                    overdueTasks: [],
                    taskPageNumber: 1
                },

            },
        }
        );



        // test whether all tasks correctly renderd

        let taskTrList = getAllByTestId(/task_tr/i);
        console.log("task list", taskTrList)
        expect(taskTrList).not.toBeNull()




    })
})