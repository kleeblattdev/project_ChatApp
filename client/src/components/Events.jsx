const Events = ({ events }) => {
	return (
		<ul>
			{events.map((e, index) => {
				<li key={index}>{e}</li>;
			})}
		</ul>
	);
};

export default Events;
