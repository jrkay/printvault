import { Button } from 'semantic-ui-react'

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button type="submit">Log Out</Button>
    </form>
  )
}
