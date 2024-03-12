import { render, screen } from "@testing-library/react"
import TaskOverlay from '../../components/taskoverlay/TaskOverlay';
import { Provider } from "react-redux";
import store from '../../store/index';

describe(" taskoverlay", ()=>{
it("render taskoverlay", async()=>{
    render(
    
    <Provider  store= {store}> 
    <TaskOverlay  onCancelClick  = {()=>{}} />
    </Provider>
    )

    const TaskOverlayHeader  = screen.getByRole("heading",{name:"Add New Task"});
    await expect(TaskOverlayHeader).toBeVisible()

})

})