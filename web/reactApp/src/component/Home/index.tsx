import "./index.css";
export default function Home() {
    return (
        <div>
            
            <div className="home_box container-md mt-4">
                
                <div className="justify-content-center d-flex flex-column">
                    <h1 className="p cover-heading mt-4">Yoyages</h1>
                    <div className="row">
                        <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                        <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                        <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                    </div>
                    <p className="mt-4">Our project is to implement a system that helps users to manage flight information. Nowadays, airlines have their own information systems, and a single user needs to log into multiple systems to manage their flight information, which is very troublesome.</p>
                    <p >Therefore we want to implement a system that helps users to view flight information of each airline, manage their historical voyages, flight reviews, and count historical data. This will help users to make more informed flight selection strategies in the future.</p>
                </div>
                <div className="row">
                    <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                    <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                    <i className="fa fa-plane fa-6 col" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}