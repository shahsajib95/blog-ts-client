

import { useContext } from 'react'
import { DataContext } from '../../../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'


export const Alert = () => {
    const {state} = useContext(DataContext)
    const { notify } = state
  return (
    <div>
      { notify.loading && <Loading /> }

      { 
        notify.error && 
        <Toast 
        title="Errors"
        body={notify.error}
        bgColor="bg-danger"
        />
      }

      { 
        notify.success && 
        <Toast 
        title="Success"
        body={notify.success}
        bgColor="bg-success"
        />
      }
    </div>
  )
}
