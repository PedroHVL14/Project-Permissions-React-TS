import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function App() {
    return (
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <Header activeScreen="Dashboard" />
            </div>
    );
}
