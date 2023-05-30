import SignInForm from "../SignInForm";
import NavBar from "./NavBar";

const SplashPage = () => {

    return (
        <>
            <NavBar />
            <section className="main">
                <div>
                    <h1>Welcome to your intergalactic community</h1>
                    <SignInForm />
                </div>
                <div>
                    {/* <img></img> */}
                    <div>Img here</div>
                </div>
            </section>
        </>
    )
}

export default SplashPage;