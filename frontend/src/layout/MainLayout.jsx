import { Outlet } from "react-router-dom";

export default function MainLayout(){
    return (
        <div>
            <div>Header</div>
            <div>Content</div>
            <div>Footer</div>
            <Outlet />
        </div>
    )
}