import MyFooter from "../components/Footer/MyFooter.jsx";

export default function FooterPage() {
    return (
    <div className="footer">
        <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}></h2>
        <MyFooter author="Võ Phạm Mỹ" email="vophammy@gmail.com" linkGithub="Movie Management Project" />
    </div>
    )
}