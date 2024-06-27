/* Components */
import SectionPage from "@/components/SectionPage";
import FormContact from "@/components/FormContact"
import SocialMedia from "@/components/SocialMedia"


export default function Contact() {
    const titlePage = "Contact";
    return (
        <SectionPage titlePage={titlePage}>
            <div className="lg:grid lg:grid-cols-2 gap-x-10 h-full items-center">
                <FormContact />
                <SocialMedia />
            </div>
        </SectionPage>

    )
}