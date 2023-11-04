"use client"

import Link from "next/link"
import { Grid, Header, Form, Button } from "semantic-ui-react"

export default function Login(props: any) {
  const { handleSubmit, reset } = props

  return (
    <>
      <Link href='/'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>{" "}
        Back
      </Link>

      <Grid
        textAlign='center'
        style={{ height: "100vh" }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form action='/auth/sign-in' method='post'>
            <Form.Field>
              <label>Email Address</label>
              <input name='email' placeholder='you@example.com' required />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='••••••••'
                required
              />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  )
}
