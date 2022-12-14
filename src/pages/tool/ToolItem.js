import { Link } from 'react-router-dom';

export default function ToolItem({ tools }) {
	return tools.map((tool) => (
		<div key={tool.id} className="tool-item">
			<img src={tool.img} alt="tool" />

			<div className="title">
				<div>
				<Link to={`/tool/${tool.route}`}><h4>{tool.name}</h4></Link>
					<span>{tool.status}</span>
				</div>
				<p>{tool.subtitle}</p>
				{tool.status === 'NEW!' && <a rel='noreferrer' target='_blank' href={"https://inkforall.com/terms/"}>Terms &Conditions</a>}
			</div>
		</div>
	));
}
