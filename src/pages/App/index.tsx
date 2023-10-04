import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function App() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeScreen="Dashboard" />
            <Header activeScreen="Dashboard" returnbutton={false} />
        </div>
    );
}
