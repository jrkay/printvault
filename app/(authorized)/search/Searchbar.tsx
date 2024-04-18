import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Segment, Input, Header, Icon } from "semantic-ui-react"

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (searchTerm) {
      router.push("/search?q=" + searchTerm)
      setSearchTerm("")
    }
  }

  return (
    <Container>
      <Segment className='search'>
        <form onSubmit={handleSubmit}>
          <Input
            fluid
            icon={<Icon name='search' link onClick={handleSubmit} />}
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </Segment>
    </Container>
  )
}

export default Searchbar
