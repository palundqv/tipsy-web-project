import gifpic from "../pictures/spinner.gif";

function promiseNoData(promise, data, error) {
	return !promise ? ( <span>no data</span> )
	: !data ?	
	(<div class="gif"> <img src={gifpic} class="centerPicture"></img></div>)
	: (data == "None Found") 
	? (<span class="noMatch">No matches found</span>)
	: error ? (
		<span>{error}</span>
	) : (
		false
	)
}
export default promiseNoData;
