import LogoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'
interface HeaderProp {
  onOpenNewTransactionModal: () => void
}
export function Header({onOpenNewTransactionModal}: HeaderProp) {
  
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="dt money"/>
        <button type="button" onClick={onOpenNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  )
}