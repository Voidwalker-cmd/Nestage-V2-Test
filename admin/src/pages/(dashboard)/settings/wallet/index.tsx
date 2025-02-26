import ContentSection from '../components/content-section'
import WalletChangeForm from './wallet-change-form'

export default function SettingsWallet() {
  return (
    <ContentSection
      title='Wallet'
      desc='Use form to change Admin wallets.'
    >
      <WalletChangeForm />
    </ContentSection>
  )
}
