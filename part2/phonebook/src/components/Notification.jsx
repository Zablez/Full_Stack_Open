const Notification = ({ message, errorFlag }) => {
    const styles ={
        border:'1px solid green'
    }
    if (message === null) {
        return null
    }

    return (
        <div className={errorFlag ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification