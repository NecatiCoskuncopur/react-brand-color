import Search from './Search'; // search componentini dahil ediyoruz.
import Brand from './Brand'; // Brand componentini dahil ediyoruz. Markalar ile ilgili ayrıntıları Brand componentinde yazacağız.
import MainContext from '../MainContext';
import {useContext} from 'react';
import Download from './Download';
import {List,AutoSizer} from 'react-virtualized'; // npm install react-virtualized


function Content() {

	const {brands, selectedBrands} = useContext(MainContext)

	const rowRenderer = ({ key, index, style, isScrolling, isVisible }) => {
		// const content = isScrolling ? <Loader /> : <Brand brand={brands[index]}  />;
		return (
			<div style={style} key={key}>
				<Brand brand={brands[index]}  />
			</div>
		)
	}

	return (
		<main className="content">
			<header className="header">
				<Search/>
				{selectedBrands.length !== 0 && <Download/>} {/* seçilmiş brand varsa Download componenti dahil edilecek */}
			</header>
			<section className="brands">
				{/* Sayfada çok fazla data bulunduğu için performans sorunları bunu çözmek için react-virtualized altındaki autosizer ve list i kullanacağız. Listi kullanarak istediğimiz hıza ulaşabiliyoruz. Ancak statik olarak bir width ve height vermemiz gerekiyor. Autosizer kullanarak bu durumu çözebiliyoruz. */}
				<AutoSizer> 
					{({height, width}) => (
						<List
							width={width}
							height={height}
							rowCount={brands.length}
							rowHeight={113}
							rowRenderer={rowRenderer}
						/>
					)}
				</AutoSizer>
			</section>
		</main>
	)
}

export default Content