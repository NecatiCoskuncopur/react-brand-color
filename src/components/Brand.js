import {useContext, useState} from 'react'
import {getContrastYIQ} from '../helpers';
import MainContext from '../MainContext';
import ClipboardButton from 'react-clipboard.js'; // npm install  react-clipboard.js

function Brand({brand}) {

	const {selectedBrands, setSelectedBrands, setCopied} = useContext(MainContext) // İhtiyacımız olan stateleri useContext kullanarak alıyoruz.

	const toggleSelected = () => {
		if (selectedBrands.includes(brand.slug)) { // Eğer arrayin içerisinde brand slug var ise
			setSelectedBrands(selectedBrands.filter(slug => slug !== brand.slug))
		} else {
			setSelectedBrands([...selectedBrands, brand.slug])
		}
	}

	const setColor = (color) => {
		setCopied(color) // Kopyalanan içerik color kodu olacak.
	}

	return (
		<div className={`brand ${selectedBrands.includes(brand.slug) ? 'selected' : ''}`}> {/* Eğer seçilen brand brand.slug içeriyorsa selected classını atıyoruz. */}
			<h5 onClick={toggleSelected}>{brand.title}</h5> {/* Markaları burada yazdıracağız. Başlığa tıklanıldığında toggleSelected adlı fonksiyonumuz çalışacak */}
			<div className="brand-colors">
				{brand.colors.map((color, key) => ( 
					// Burada markalara bağlı renkleri mapleyerek döneceğiz ve bu renkleri spana yazdıracağız. Şuan ekranımızda bu renk kodları text olarak mevcut. Bunların renklerini almak için css tarafında backgroundcolor olarak değişken vereceğiz. Style içine atadığımız bgColor: #${color} ile bu renkleri spanların arka plan rengi olarak ayarlayacağız. Artık spanların arka plan rengi ilgili spandaki renk koduna bağlı olarak ayarlandığı gibi spanların içinde renk koduda text olarak yazılacak. Ancak bu textlere statik olarak bir renk atarsak renge bağlı olarak okunma sorunları ortaya çıkacak. Bunun için helpers componentinde tanımladığımız getContrastYIQ fonksiyonunu burada dahil edeceğiz. Textcolor css tarafında değişken olarak tanımlanacak ve yazı rengimiz contrasta göre ayarlanacak.
					<ClipboardButton key={key} data-clipboard-text={color} onSuccess={() => setColor(color)} // Biz bir spanın üstüne tıkladığımızda ilgili spanın renk kodunu kopyalamasını istiyoruz.Bunun için react-clipboard kullanacağız.Clipboard button olarak dahil ediyor ve daha önce yaptığımız işlemleri bu componente prop olarak veriyoruz. Component='span' diyerek bu componentin span olduğunu belirtiyoruz. Kopyalama işleminde onSuccess ile birlikte setcolor fonksyionu çalışacak.
					                 component="span"
					                 style={{'--bgColor': `#${color}`, '--textColor': `${getContrastYIQ(color)}`}}>
						{color}
					</ClipboardButton>
				))}
			</div>
		</div>
	)
}

export default Brand