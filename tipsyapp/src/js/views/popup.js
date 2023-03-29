function Popup(props) {
	return (
		props.trigger && (
			<div className={props.className}>
				<div className="popupInner">
					{props.delete ? (
						<>
							<button className="yesBtn" onClick={() => (props.setTrigger(false), props.removeFromCustom())}>
								YES
							</button>
							<button className="noBtn" onClick={() => props.setTrigger(false)}>
								NO
							</button>
						</>
					) : (
						<button className="closeBtn" onClick={() => props.setTrigger()}>
							x
						</button>
					)}
					<h3 className="App">{props.message}</h3>
				</div>
			</div>
		)
	);
}

export default Popup;
