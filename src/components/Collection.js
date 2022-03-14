import {useContext, useEffect, useState} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {GrLinkPrevious} from 'react-icons/gr';
import Download from './Download';
import LazyLoad from 'react-lazyload';
import Brand from './Brand';
import MainContext from '../MainContext';
import Loader from './Loader';

function Collection(props) {
	const {slugs} = useParams() //React-router-dom altındaki useParams'ı kullanarak slugs ı alıyoruz.
	const history = useHistory()
	const {setSelectedBrands, selectedBrands, setSearch, brands} = useContext(MainContext)

	const clearSelectedBrands = () => {
		setSelectedBrands([]) //Seçimleri ortadan kaldıracak
		setSearch('')
		history.push('/') //Bizi ana dizine döndürecek
	}

	useEffect(() => {
		setSelectedBrands(slugs.split(','))
	}, []) // SelectedBrands içine sluglardan seçilmiş olanları "," işaretinden parçalayarak link ekranımıza yansıtacağız

	return ( //Content içindeki hemen hemen aynı yapıyı burada kullanıyoruz
		<main className="content">
			<header className="header">

				<Link to="/" onClick={clearSelectedBrands}>
					<a className="back-btn">
						<GrLinkPrevious /> {/* Anasayfaya dönmek ve seçilenleri silmek için tıklandığında clearSelectedBrands fonksiyonu çalışacak */}
						All Brands
					</a>
				</Link>

				{selectedBrands.length !== 0 && <Download />}
			</header>
			<section className="brands">
				{selectedBrands.map(slug => {
					let brand = brands.find(brand => brand.slug === slug)
					return (
						<LazyLoad key={brand.slug} once={true} overflow={true} placeholder={<Loader />}> {/* placeholder olarak daha önce contentLoader ile yaptığımız Loader componentini dahil ediyoruz. */}
							<Brand brand={brand}/>
						</LazyLoad>
					)
				})}
			</section>
		</main>
	)
}

export default Collection