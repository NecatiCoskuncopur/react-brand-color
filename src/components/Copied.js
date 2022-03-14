import {useState} from 'react'
import {getContrastYIQ} from '../helpers';

function Copied({ color }) {
	return (
		// dive verdiğimiz proplarla kopyalanan renk ve yazının rengi clipboarda yansıtılacak. (Daha önce brand componentinde yaptığımız gibi)
		<div className="copied" style={{'--bgColor': `#${color}`, '--textColor': `${getContrastYIQ(color)}`}}> 
			Copied #{color} to Clipboard {/* Kopyalanan renk ekran yazılacak */}
		</div>
	)
}

export default Copied