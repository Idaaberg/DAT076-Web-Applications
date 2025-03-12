import { logout } from "../api";
import Header from "../components/Header";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <div className="profileContainer">
                <h1 className="profileHeader">Profile</h1>
                <div className="userName">
                    <p className="userTitle">Username: </p>
                    <p>Username</p>
                </div>
                <div className="passWord">
                    <p className="passTitle">Password: </p>
                    <p>********</p>
                </div>
                <div className="buttons">
                    <button className="logOutBtn" type="button" onClick={handleLogOut}>
                        Log Out
                    </button>
                    <a href="/home">
                        <button className="backBtn" type="button">
                            Back
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}
export default Profile;