import MainContext from './MainContext';
import Sidebar from './components/Sidebar'
import Content from './components/Content';
import BrandsData from './brands.json';
import {useEffect, useState} from 'react';
import Copied from './components/Copied'; // Kopyaladığımız rengin istediğimiz alanda bir clipboard içinde ekrana gelmesini istiyoruz.
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Collection from './components/Collection';

function App() {

	let brandsArray = []
	Object.keys(BrandsData).map(key => {
		brandsArray.push(BrandsData[key])
	})

	const [brands, setBrands] = useState(brandsArray)
	const [selectedBrands, setSelectedBrands] = useState([])
	const [copied, setCopied] = useState(false) 
	const [search, setSearch] = useState('') // Artık inputtan arayarak brandlere ulaşmak istiyoruz.

	useEffect(() => { // Eğer kopyalama işlemi yapıldıysa 1.5 saniye boyunca ekranda gösterecek ve daha sonra ekrandan kaybolacak
		const timeout = setTimeout(() => {
			setCopied(false)
		}, 1500)
		return () => {
			clearTimeout(timeout)
		}
	}, [copied])

	useEffect(() => {
		setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)))
	}, [search]) // Search değiştiğinde brand title searchi içerenleri bize set edecek.

	useEffect(() => {
		document.title = 'React BrandColors'
	}, [])

	const data = {
		brands,
		selectedBrands,
		setSelectedBrands,
		setCopied,
		search,
		setSearch
	}

	return (
		<>
			<MainContext.Provider value={data}> {/* context içine prop olarak verdiğimiz value ile göndermek istediğimiz dataları burada yazabiliriz. */}
				{copied && <Copied color={copied}/>} {/* Renk kopyalandığında Copied componentini gösterecek */}
				<Sidebar />
				<Router>
					<Switch>
						<Route path="/" exact>
							<Content /> {/* Eğer ana dizindeyse content componentini çağır */}
						</Route>
						<Route path="/collection/:slugs">  
							<Collection />{/* Eğer collection/:slugs dizinindeyse collection componentini çağır */}
						</Route>
					</Switch>
				</Router>
			</MainContext.Provider>
		</>
	);
}

export default App;