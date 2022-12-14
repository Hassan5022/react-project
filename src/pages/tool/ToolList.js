// style
import './ToolList.css'

import tools from '../../routes.json';
import ToolItem from './ToolItem';

export default function ToolList() {
	return (
        <div className="tool-list">
            <ToolItem tools={ tools} />
		</div>
	);
}
