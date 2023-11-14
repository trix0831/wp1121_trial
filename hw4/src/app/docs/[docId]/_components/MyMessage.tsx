type MyMessageProps ={
    message:string;
}

export function MyMessage( {message}: MyMessageProps){
    return(
        <>
            <div className="w-fit bg-blue-600 rounded-2xl flex items-center mb-2">
                <p className="m-2 text-semibold text-white">{message}</p>
            </div>
        </>
    );  
}

export default MyMessage;