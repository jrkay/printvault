import { Button } from "semantic-ui-react"
import { useRouter } from "next/navigation"

const CancelButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <Button basic size='large' color='violet' onClick={handleClick}>
      Cancel
    </Button>
  )
}

export default CancelButton
