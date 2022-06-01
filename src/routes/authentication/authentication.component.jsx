import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import { createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
const Authentication = () => {
    
    return (
        <div>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication