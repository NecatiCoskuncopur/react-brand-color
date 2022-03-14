import {useState} from 'react'
import Modal from 'react-modal' //npm install react-modal
import { GrClose } from 'react-icons/gr'; // npm install react-icons

function Sidebar() {

	const [modalIsOpen, setModalIsOpen] = useState(false) // Modalın açık olup olmadığı kontrol edilecek.

	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen); // Modal burada tanımladığımız function ile açıp kapatabileceğiz.
	}

	return (
		<>
			<aside className="sidebar">
				<div className="logo">
					<a>Brand<b>Colors</b></a>
				</div>
				<div className="description">
					The biggest collection of official brand color codes around. Curated by @brandcolors and friends.
				</div>
				<nav className="menu">
					<ul>
						<li>
							<a onClick={toggleModal}>About BrandColors</a> {/* a elementine tıkladığımızda bir popup açmak istiyoruz.Bunun react-modal paketini kuracağız. // tıklandığında toggleModal fonksiyonu çalışacak. */}
						</li>
					</ul>
				</nav>
			</aside>

			<Modal isOpen={modalIsOpen} //Modalın açık olup olmadığını kontrol edecek. Bunu takip etmek için useState kullanacağız
			       onRequestClose={toggleModal} // 
			       className="about-modal"
			       overlayClassName="about-modal-overlay">
				<button className="modal-close-btn" onClick={toggleModal}> {/* butona basarak modalı kapatabileceğiz. */}
					<GrClose /> {/* Bu iconları kullanmak için react-icon paketini dahil ediyoruz.*/}
				</button>
				<h3>About BrandColors</h3>
				<p>
					BrandColors was created by DesignBombs. The goal was to create a helpful reference for the brand color codes that are needed most often.
				</p>
				<p>
					It's been featured by Smashing Magazine, CSS-Tricks, Web Design Depot, Tuts+, and over 2 million pageviews. There are now over 600 brands with 1600 colors and the collection is always growing.
				</p>
			</Modal>
		</>
	)
}

export default Sidebar