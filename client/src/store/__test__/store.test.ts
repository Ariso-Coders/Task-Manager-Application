import { string } from "yup";
import Task from '../../pages/Task';
import { RootState } from "../index"
import taskSlice, { TasksState, taskActions } from "../task-slice";
import { filterTaskStaus } from '../task-slice';

describe('Task Slice', () => {
    let initialState:TasksState;

    beforeEach(()=>{
        initialState ={
            totalTask:[],
            filteredTask:[],
            filterMessage:'',
            overdueTasks:[],
            taskPageNumber:1
        }
    })
    

    it("should be set tasks correctly", ()=>{
        const tasks =  [
            {
                date:"2024-03-21T00:00:00.000Z",
                task_description:"2",
                task_status:true,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af7e71fbf1d8b053eec7"
            },
            {
                date:"2024-03-22T00:00:00.000Z",
                task_description:"3",
                task_status:true,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af8371fbf1d8b053eeca"
            },
        ];

        const action = taskActions.setTasks(tasks);
        const newState = taskSlice.reducer(initialState,action);
        expect(newState.totalTask).toEqual(tasks)
    });

    it("should set filter task by status",()=>{
        const tasks =  [
            {
                date:"2024-03-21T00:00:00.000Z",
                task_description:"2",
                task_status:true,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af7e71fbf1d8b053eec7"
            },
            {
                date:"2024-03-22T00:00:00.000Z",
                task_description:"3",
                task_status:false,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af8371fbf1d8b053eeca"
            },
            {
                date:"2024-03-21T00:00:00.000Z",
                task_description:"4",
                task_status:true,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af7e71fbf1d8b053eec8"
            },
            {
                date:"2024-03-22T00:00:00.000Z",
                task_description:"5",
                task_status:false,
                userID:"65c73f02e32fc26d22101e27",
                __v:0,
                _id:"65e5af8371fbf1d8b053eec9"
            },
        ];


        const action = taskActions.setFilterByStatus({searchTerm:"",showCompleted:false,showNotCompleted:true});
        const newStateAfterFilterByStatus = taskSlice.reducer(initialState,action);
        expect(newStateAfterFilterByStatus).toBeNull();
    //     expect(newStateAfterFilterByStatus.filteredTask).toEqual([ {
    //         date:"2024-03-22T00:00:00.000Z",
    //         task_description:"5",
    //         task_status:false,
    //         userID:"65c73f02e32fc26d22101e27",
    //         __v:0,
    //         _id:"65e5af8371fbf1d8b053eec9"
    //     },
    
    //     {
    //         date:"2024-03-22T00:00:00.000Z",
    //         task_description:"3",
    //         task_status:false,
    //         userID:"65c73f02e32fc26d22101e27",
    //         __v:0,
    //         _id:"65e5af8371fbf1d8b053eeca"
    //     },
    
    // ])

    })
  
})
