import {useContext, useEffect, useState} from 'react'
import MainContext from '../MainContext';
import {Link} from 'react-router-dom' // npm install react-router-dom
import {GrLink, GrDownload, GrClose} from 'react-icons/gr'; // İhtiyacımız olan iconları react-icons kullanarak import ediyoruz.

function Download() {

	const {selectedBrands, brands, setSelectedBrands} = useContext(MainContext) //useContext selectedBrands, brands, setSelectedBrands componente dahil ediliyor. 
	const [downloadUrl, setDownloadUrl] = useState() // Seçtiğimiz markaların renklerini indirebilmek için state kullanacağız
	const [cssMethod, setCssMethod] = useState('css') // Seçtiğimiz methodu tutmak için state kullanacağız.

	useEffect(() => {
		if (selectedBrands.length > 0){

			let output = ''
			switch (cssMethod){ //Bir switch case yapısı kurarak metodlar arasındaki farklı syntaxları belirtmemiz gerekiyor. 

				case 'css':
					output += ':root {\n'
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `--${slug}-${key}: #${color};\n`
						})
					})
					output += '}'
					break;

				case 'scss':
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `\$${slug}-${key}: #${color};\n`
						})
					})
					break;

				case 'less':
					selectedBrands.map(slug => {
						let brand = brands.find(brand => brand.slug === slug)
						brand.colors.map((color, key) => {
							output += `@${slug}-${key}: #${color};\n`
						})
					})
					break;

			}

			const blob = new Blob([output]) //Blob için ayrıca araştır.
			const url = URL.createObjectURL(blob)
			setDownloadUrl(url)
			return () => {
				URL.revokeObjectURL(url)
				setDownloadUrl('')
			}
		}
	}, [selectedBrands, cssMethod])

	return (
		<div className="download">
			<div className="actions">
				<select onChange={(e) => setCssMethod(e.target.value)}> {/* onChange ile buradan css methodumuzu seçebileceğiz. */}
					<option value="css">CSS</option>
					<option value="scss">SCSS</option>
					<option value="less">LESS</option>
				</select>
				<a download={`brands.${cssMethod}`} href={downloadUrl}>
					<GrDownload /> {/* a etiketine tıkladığımızda download işlemimiz gerçekleşecek. Select ile istediğimiz formatta aldığımız renk kodlarının inmesini istiyoruz. a etiketine download propu ile indirmek istediğimiz renkleri dinamik olarak veriyoruz. seçilen markalara ait renkler seçtiğimiz metoda göre inecek. */}
				</a>
				<Link to={`/collection/${selectedBrands.join(',')}`}>
					<GrLink /> {/* Seçtiğimiz markaları yeni bir sayfada açmak istiyoruz. Bunun react-router kullanacağız. Tıklanıldığında doğrudan seçtiğimiz brandlerin olduğu bir sayfaya yönlendirecek. */}
				</Link>
			</div>
			<div className="selected" onClick={() => setSelectedBrands([])}> {/* Selected divi içerisinde herhangi bir yere tıkladığımızda seçilmiş olan brandlerin seçimi kaldırılacak. Kısaca seçim işlemi geri alınacak */}
				<GrClose />
				{selectedBrands.length} brands collected {/* Kaç tane brand seçildiyse dinamik olarak o değeri yazacak */}
			</div>
		</div>
	)
}

export default Download