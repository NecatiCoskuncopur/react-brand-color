import {useContext, useState} from 'react'
import {GrSearch} from 'react-icons/gr'; //npm install react-icons
import MainContext from '../MainContext';

function Search() {
	const {search, setSearch} = useContext(MainContext) // useContext ile search ve setSearch componente dahil ediliyor.
	return (
		<div className="search">
			<div className="icon">
				<GrSearch />
			</div>
			<input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search Brands" />
			{/* onChange ile inputtaki değişiklikleri yakalayacağız ve filtreleme işlemini yapacağız. */}
		</div>
	)
}

export default Search