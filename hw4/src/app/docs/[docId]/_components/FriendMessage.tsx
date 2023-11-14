type FriendMessageProps ={
    message:string;
}

export function FriendMessage( {message}: FriendMessageProps){
    return(
        <>
            <div className="w-fit bg-gray-500 rounded-2xl flex items-center mb-2">
                <p className="m-2 text-semibold text-white">{message}</p>
            </div>
        </>
    );  
}

export default FriendMessage;