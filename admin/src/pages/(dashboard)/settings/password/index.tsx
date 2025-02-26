import ContentSection from '../components/content-section'
import PasswordForm from './password-form.tsx'

export default function SettingsPassword() {
  return (
    <ContentSection
      title='Password'
      desc='Use form to chnage Admin passwords.'
    >
      <PasswordForm />
    </ContentSection>
  )
}
