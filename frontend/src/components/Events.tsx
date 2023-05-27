export const Events = ({ events }: { events: string[] }) => {
    return (
        <ul>
            {events.map((event, i) => {
                return <li key={i}>{event}</li>
            })}
        </ul>
    )
}
