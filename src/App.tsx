import "./index.scss";
import TopMenuBar from "./layout/TopMenuBar";
import MainBody from "./layout/MainBody";
import CardList from "./components/cards/card-list/CardList";

const App = () => {
    return (
        <>
            <TopMenuBar/>
            <MainBody>
                <CardList/>
            </MainBody>
        </>
    );
};

export default App;
