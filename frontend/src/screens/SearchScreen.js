import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listBuses } from '../actions/busActions';
import styled from 'styled-components';
import Bus from '../components/Bus';
import DatePicker from "react-datepicker";

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Ratting from '../components/Ratting';
import { prices, ratings } from '../utils';
import Search from '../components/Search';


export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    from = '',
    to = '',
    departureDate = ''
  } = useParams();


//search from the search screen

  const [from_s, setFrom] = useState('');
  const [to_s, setTo] = useState('');
  let [departureDate_s, setDepartureDate] = useState(new Date());

  const changeTheDate =  function(d){
    return (d.getMonth() + 1) + 
    "-" +  d.getDate() +
    "-" +  d.getFullYear();
} 

    const submitHandler = (e) => {
      departureDate_s = changeTheDate(departureDate_s);
      e.preventDefault();
      navigate(`/search/from/${from_s}/to/${to_s}/departureDate/${departureDate_s}`);
    };
  


    

  // console.log(departureDate)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const buseList   = useSelector((state) => state.buseList  );
  const { loading, error, buses  } = buseList ;

 

  const busCategoryList  = useSelector((state) => state.busCategoryList );
  const { loading: loadingCategories, error: errorCategories, categories } = busCategoryList ;
  useEffect(() => {
    dispatch(
        listBuses({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
        from,
        to,
        departureDate
      })
    );
  }, [category, dispatch, max, min, name, order, rating,from,to,departureDate]);

 




  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterFrom = filter.from || from;
    const filterTo = filter.to || to;
    const filterDepartureDate = filter.departureDate || departureDate;

    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
   
    return `/search/from/${filterFrom}/to/${filterTo}/departureDate/${filterDepartureDate}/category/${filterCategory}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };
  return (
    
    <div className='container-fluid search-screcn-body'>


   
             
{/* <form onSubmit={submitHandler}> */}
<form onSubmit={submitHandler}>
    <div className="row ml-4 mt-3 searchScreenSection ">
    
    <div className="col-3 ">
     
      {/* onChange={(e) => setFrom(e.target.value)} */}
      <select onChange={(e) => setFrom(e.target.value)}  required className="custom-select    ">
      <option  value=""  >Select Departure</option>
      <option value="Islamabad">Islamabad</option>
  
    <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
    <option value="Ahmadpur East">Ahmadpur East</option>
    <option value="Ali Khan Abad">Ali Khan Abad</option>
    <option value="Alipur">Alipur</option>
    <option value="Arifwala">Arifwala</option>
    <option value="Attock">Attock</option>
    <option value="Bhera">Bhera</option>
    <option value="Bhalwal">Bhalwal</option>
    <option value="Bahawalnagar">Bahawalnagar</option>
    <option value="Bahawalpur">Bahawalpur</option>
    <option value="Bhakkar">Bhakkar</option>
    <option value="Burewala">Burewala</option>
    <option value="Chillianwala">Chillianwala</option>
    <option value="Chakwal">Chakwal</option>
    <option value="Chichawatni">Chichawatni</option>
    <option value="Chiniot">Chiniot</option>
    <option value="Chishtian">Chishtian</option>
    <option value="Daska">Daska</option>
    <option value="Darya Khan">Darya Khan</option>
    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
    <option value="Dhaular">Dhaular</option>
    <option value="Dina">Dina</option>
    <option value="Dinga">Dinga</option>
    <option value="Dipalpur">Dipalpur</option>
    <option value="Faisalabad">Faisalabad</option>
    <option value="Ferozewala">Ferozewala</option>
    <option value="Fateh Jhang">Fateh Jang</option>
    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
    <option value="Gojra">Gojra</option>
    <option value="Gujranwala">Gujranwala</option>
    <option value="Gujrat">Gujrat</option>
    <option value="Gujar Khan">Gujar Khan</option>
    <option value="Hafizabad">Hafizabad</option>
    <option value="Haroonabad">Haroonabad</option>
    <option value="Hasilpur">Hasilpur</option>
    <option value="Haveli Lakha">Haveli Lakha</option>
    <option value="Jatoi">Jatoi</option>
    <option value="Jalalpur">Jalalpur</option>
    <option value="Jattan">Jattan</option>
    <option value="Jampur">Jampur</option>
    <option value="Jaranwala">Jaranwala</option>
    <option value="Jhang">Jhang</option>
    <option value="Jhelum">Jhelum</option>
    <option value="Kalabagh">Kalabagh</option>
    <option value="Karor Lal Esan">Karor Lal Esan</option>
    <option value="Kasur">Kasur</option>
    <option value="Kamalia">Kamalia</option>
    <option value="Kamoke">Kamoke</option>
    <option value="Khanewal">Khanewal</option>
    <option value="Khanpur">Khanpur</option>
    <option value="Kharian">Kharian</option>
    <option value="Khushab">Khushab</option>
    <option value="Kot Addu">Kot Addu</option>
    <option value="Jauharabad">Jauharabad</option>
    <option value="Lahore">Lahore</option>
    <option value="Lalamusa">Lalamusa</option>
    <option value="Layyah">Layyah</option>
    <option value="Liaquat Pur">Liaquat Pur</option>
    <option value="Lodhran">Lodhran</option>
    <option value="Malakwal">Malakwal</option>
    <option value="Mamoori">Mamoori</option>
    <option value="Mailsi">Mailsi</option>
    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
    <option value="Mian Channu">Mian Channu</option>
    <option value="Mianwali">Mianwali</option>
    <option value="Multan">Multan</option>
    <option value="Murree">Murree</option>
    <option value="Muridke">Muridke</option>
    <option value="Mianwali Bangla">Mianwali Bangla</option>
    <option value="Muzaffargarh">Muzaffargarh</option>
    <option value="Narowal">Narowal</option>
    <option value="Nankana Sahib">Nankana Sahib</option>
    <option value="Okara">Okara</option>
    <option value="Renala Khurd">Renala Khurd</option>
    <option value="Pakpattan">Pakpattan</option>
    <option value="Pattoki">Pattoki</option>
    <option value="Pir Mahal">Pir Mahal</option>
    <option value="Qaimpur">Qaimpur</option>
    <option value="Qila Didar Singh">Qila Didar Singh</option>
    <option value="Rabwah">Rabwah</option>
    <option value="Raiwind">Raiwind</option>
    <option value="Rajanpur">Rajanpur</option>
    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
    <option value="Rawalpindi">Rawalpindi</option>
    <option value="Sadiqabad">Sadiqabad</option>
    <option value="Safdarabad">Safdarabad</option>
    <option value="Sahiwal">Sahiwal</option>
    <option value="Sangla Hill">Sangla Hill</option>
    <option value="Sarai Alamgir">Sarai Alamgir</option>
    <option value="Sargodha">Sargodha</option>
    <option value="Shakargarh">Shakargarh</option>
    <option value="Sheikhupura">Sheikhupura</option>
    <option value="Sialkot">Sialkot</option>
    <option value="Sohawa">Sohawa</option>
    <option value="Soianwala">Soianwala</option>
    <option value="Siranwali">Siranwali</option>
    <option value="Talagang">Talagang</option>
    <option value="Taxila">Taxila</option>
    <option value="Toba Tek Singh">Toba Tek Singh</option>
    <option value="Vehari">Vehari</option>
    <option value="Wah Cantonment">Wah Cantonment</option>
    <option value="Wazirabad">Wazirabad</option>
    <option value="" disabled>Sindh Cities</option>
    <option value="Badin">Badin</option>
    <option value="Bhirkan">Bhirkan</option>
    <option value="Rajo Khanani">Rajo Khanani</option>
    <option value="Chak">Chak</option>
    <option value="Dadu">Dadu</option>
    <option value="Digri">Digri</option>
    <option value="Diplo">Diplo</option>
    <option value="Dokri">Dokri</option>
    <option value="Ghotki">Ghotki</option>
    <option value="Haala">Haala</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Islamkot">Islamkot</option>
    <option value="Jacobabad">Jacobabad</option>
    <option value="Jamshoro">Jamshoro</option>
    <option value="Jungshahi">Jungshahi</option>
    <option value="Kandhkot">Kandhkot</option>
    <option value="Kandiaro">Kandiaro</option>
    <option value="Karachi">Karachi</option>
    <option value="Kashmore">Kashmore</option>
    <option value="Keti Bandar">Keti Bandar</option>
    <option value="Khairpur">Khairpur</option>
    <option value="Kotri">Kotri</option>
    <option value="Larkana">Larkana</option>
    <option value="Matiari">Matiari</option>
    <option value="Mehar">Mehar</option>
    <option value="Mirpur Khas">Mirpur Khas</option>
    <option value="Mithani">Mithani</option>
    <option value="Mithi">Mithi</option>
    <option value="Mehrabpur">Mehrabpur</option>
    <option value="Moro">Moro</option>
    <option value="Nagarparkar">Nagarparkar</option>
    <option value="Naudero">Naudero</option>
    <option value="Naushahro Feroze">Naushahro Feroze</option>
    <option value="Naushara">Naushara</option>
    <option value="Nawabshah">Nawabshah</option>
    <option value="Nazimabad">Nazimabad</option>
    <option value="Qambar">Qambar</option>
    <option value="Qasimabad">Qasimabad</option>
    <option value="Ranipur">Ranipur</option>
    <option value="Ratodero">Ratodero</option>
    <option value="Rohri">Rohri</option>
    <option value="Sakrand">Sakrand</option>
    <option value="Sanghar">Sanghar</option>
    <option value="Shahbandar">Shahbandar</option>
    <option value="Shahdadkot">Shahdadkot</option>
    <option value="Shahdadpur">Shahdadpur</option>
    <option value="Shahpur Chakar">Shahpur Chakar</option>
    <option value="Shikarpaur">Shikarpaur</option>
    <option value="Sukkur">Sukkur</option>
    <option value="Tangwani">Tangwani</option>
    <option value="Tando Adam Khan">Tando Adam Khan</option>
    <option value="Tando Allahyar">Tando Allahyar</option>
    <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
    <option value="Thatta">Thatta</option>
    <option value="Umerkot">Umerkot</option>
    <option value="Warah">Warah</option>
    <option value="" disabled>Khyber Cities</option>
    <option value="Abbottabad">Abbottabad</option>
    <option value="Adezai">Adezai</option>
    <option value="Alpuri">Alpuri</option>
    <option value="Akora Khattak">Akora Khattak</option>
    <option value="Ayubia">Ayubia</option>
    <option value="Banda Daud Shah">Banda Daud Shah</option>
    <option value="Bannu">Bannu</option>
    <option value="Batkhela">Batkhela</option>
    <option value="Battagram">Battagram</option>
    <option value="Birote">Birote</option>
    <option value="Chakdara">Chakdara</option>
    <option value="Charsadda">Charsadda</option>
    <option value="Chitral">Chitral</option>
    <option value="Daggar">Daggar</option>
    <option value="Dargai">Dargai</option>
    <option value="Darya Khan">Darya Khan</option>
    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
    <option value="Doaba">Doaba</option>
    <option value="Dir">Dir</option>
    <option value="Drosh">Drosh</option>
    <option value="Hangu">Hangu</option>
    <option value="Haripur">Haripur</option>
    <option value="Karak">Karak</option>
    <option value="Kohat">Kohat</option>
    <option value="Kulachi">Kulachi</option>
    <option value="Lakki Marwat">Lakki Marwat</option>
    <option value="Latamber">Latamber</option>
    <option value="Madyan">Madyan</option>
    <option value="Mansehra">Mansehra</option>
    <option value="Mardan">Mardan</option>
    <option value="Mastuj">Mastuj</option>
    <option value="Mingora">Mingora</option>
    <option value="Nowshera">Nowshera</option>
    <option value="Paharpur">Paharpur</option>
    <option value="Pabbi">Pabbi</option>
    <option value="Peshawar">Peshawar</option>
    <option value="Saidu Sharif">Saidu Sharif</option>
    <option value="Shorkot">Shorkot</option>
    <option value="Shewa Adda">Shewa Adda</option>
    <option value="Swabi">Swabi</option>
    <option value="Swat">Swat</option>
    <option value="Tangi">Tangi</option>
    <option value="Tank">Tank</option>
    <option value="Thall">Thall</option>
    <option value="Timergara">Timergara</option>
    <option value="Tordher">Tordher</option>
    <option value="" disabled>Balochistan Cities</option>
    <option value="Awaran">Awaran</option>
    <option value="Barkhan">Barkhan</option>
    <option value="Chagai">Chagai</option>
    <option value="Dera Bugti">Dera Bugti</option>
    <option value="Gwadar">Gwadar</option>
    <option value="Harnai">Harnai</option>
    <option value="Jafarabad">Jafarabad</option>
    <option value="Jhal Magsi">Jhal Magsi</option>
    <option value="Kacchi">Kacchi</option>
    <option value="Kalat">Kalat</option>
    <option value="Kech">Kech</option>
    <option value="Kharan">Kharan</option>
    <option value="Khuzdar">Khuzdar</option>
    <option value="Killa Abdullah">Killa Abdullah</option>
    <option value="Killa Saifullah">Killa Saifullah</option>
    <option value="Kohlu">Kohlu</option>
    <option value="Lasbela">Lasbela</option>
    <option value="Lehri">Lehri</option>
    <option value="Loralai">Loralai</option>
    <option value="Mastung">Mastung</option>
    <option value="Musakhel">Musakhel</option>
    <option value="Nasirabad">Nasirabad</option>
    <option value="Nushki">Nushki</option>
    <option value="Panjgur">Panjgur</option>
    <option value="Pishin Valley">Pishin Valley</option>
    <option value="Quetta">Quetta</option>
    <option value="Sherani">Sherani</option>
    <option value="Sibi">Sibi</option>
    <option value="Sohbatpur">Sohbatpur</option>
    <option value="Washuk">Washuk</option>
    <option value="Zhob">Zhob</option>
    <option value="Ziarat">Ziarat</option>

      </select>
     </div>
      <div className="col-3 ">
     
      {/* onChange={(e) => setTo(e.target.value)} */}
<select onChange={(e) => setTo(e.target.value)}  required  class="custom-select select-location ">
  <option     value="">Select Arrival</option>
  <option value="Islamabad">Islamabad</option>
    <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
    <option value="Ahmadpur East">Ahmadpur East</option>
    <option value="Ali Khan Abad">Ali Khan Abad</option>
    <option value="Alipur">Alipur</option>
    <option value="Arifwala">Arifwala</option>
    <option value="Attock">Attock</option>
    <option value="Bhera">Bhera</option>
    <option value="Bhalwal">Bhalwal</option>
    <option value="Bahawalnagar">Bahawalnagar</option>
    <option value="Bahawalpur">Bahawalpur</option>
    <option value="Bhakkar">Bhakkar</option>
    <option value="Burewala">Burewala</option>
    <option value="Chillianwala">Chillianwala</option>
    <option value="Chakwal">Chakwal</option>
    <option value="Chichawatni">Chichawatni</option>
    <option value="Chiniot">Chiniot</option>
    <option value="Chishtian">Chishtian</option>
    <option value="Daska">Daska</option>
    <option value="Darya Khan">Darya Khan</option>
    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
    <option value="Dhaular">Dhaular</option>
    <option value="Dina">Dina</option>
    <option value="Dinga">Dinga</option>
    <option value="Dipalpur">Dipalpur</option>
    <option value="Faisalabad">Faisalabad</option>
    <option value="Ferozewala">Ferozewala</option>
    <option value="Fateh Jhang">Fateh Jang</option>
    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
    <option value="Gojra">Gojra</option>
    <option value="Gujranwala">Gujranwala</option>
    <option value="Gujrat">Gujrat</option>
    <option value="Gujar Khan">Gujar Khan</option>
    <option value="Hafizabad">Hafizabad</option>
    <option value="Haroonabad">Haroonabad</option>
    <option value="Hasilpur">Hasilpur</option>
    <option value="Haveli Lakha">Haveli Lakha</option>
    <option value="Jatoi">Jatoi</option>
    <option value="Jalalpur">Jalalpur</option>
    <option value="Jattan">Jattan</option>
    <option value="Jampur">Jampur</option>
    <option value="Jaranwala">Jaranwala</option>
    <option value="Jhang">Jhang</option>
    <option value="Jhelum">Jhelum</option>
    <option value="Kalabagh">Kalabagh</option>
    <option value="Karor Lal Esan">Karor Lal Esan</option>
    <option value="Kasur">Kasur</option>
    <option value="Kamalia">Kamalia</option>
    <option value="Kamoke">Kamoke</option>
    <option value="Khanewal">Khanewal</option>
    <option value="Khanpur">Khanpur</option>
    <option value="Kharian">Kharian</option>
    <option value="Khushab">Khushab</option>
    <option value="Kot Addu">Kot Addu</option>
    <option value="Jauharabad">Jauharabad</option>
    <option value="Lahore">Lahore</option>
    <option value="Lalamusa">Lalamusa</option>
    <option value="Layyah">Layyah</option>
    <option value="Liaquat Pur">Liaquat Pur</option>
    <option value="Lodhran">Lodhran</option>
    <option value="Malakwal">Malakwal</option>
    <option value="Mamoori">Mamoori</option>
    <option value="Mailsi">Mailsi</option>
    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
    <option value="Mian Channu">Mian Channu</option>
    <option value="Mianwali">Mianwali</option>
    <option value="Multan">Multan</option>
    <option value="Murree">Murree</option>
    <option value="Muridke">Muridke</option>
    <option value="Mianwali Bangla">Mianwali Bangla</option>
    <option value="Muzaffargarh">Muzaffargarh</option>
    <option value="Narowal">Narowal</option>
    <option value="Nankana Sahib">Nankana Sahib</option>
    <option value="Okara">Okara</option>
    <option value="Renala Khurd">Renala Khurd</option>
    <option value="Pakpattan">Pakpattan</option>
    <option value="Pattoki">Pattoki</option>
    <option value="Pir Mahal">Pir Mahal</option>
    <option value="Qaimpur">Qaimpur</option>
    <option value="Qila Didar Singh">Qila Didar Singh</option>
    <option value="Rabwah">Rabwah</option>
    <option value="Raiwind">Raiwind</option>
    <option value="Rajanpur">Rajanpur</option>
    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
    <option value="Rawalpindi">Rawalpindi</option>
    <option value="Sadiqabad">Sadiqabad</option>
    <option value="Safdarabad">Safdarabad</option>
    <option value="Sahiwal">Sahiwal</option>
    <option value="Sangla Hill">Sangla Hill</option>
    <option value="Sarai Alamgir">Sarai Alamgir</option>
    <option value="Sargodha">Sargodha</option>
    <option value="Shakargarh">Shakargarh</option>
    <option value="Sheikhupura">Sheikhupura</option>
    <option value="Sialkot">Sialkot</option>
    <option value="Sohawa">Sohawa</option>
    <option value="Soianwala">Soianwala</option>
    <option value="Siranwali">Siranwali</option>
    <option value="Talagang">Talagang</option>
    <option value="Taxila">Taxila</option>
    <option value="Toba Tek Singh">Toba Tek Singh</option>
    <option value="Vehari">Vehari</option>
    <option value="Wah Cantonment">Wah Cantonment</option>
    <option value="Wazirabad">Wazirabad</option>
    <option value="" disabled>Sindh Cities</option>
    <option value="Badin">Badin</option>
    <option value="Bhirkan">Bhirkan</option>
    <option value="Rajo Khanani">Rajo Khanani</option>
    <option value="Chak">Chak</option>
    <option value="Dadu">Dadu</option>
    <option value="Digri">Digri</option>
    <option value="Diplo">Diplo</option>
    <option value="Dokri">Dokri</option>
    <option value="Ghotki">Ghotki</option>
    <option value="Haala">Haala</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Islamkot">Islamkot</option>
    <option value="Jacobabad">Jacobabad</option>
    <option value="Jamshoro">Jamshoro</option>
    <option value="Jungshahi">Jungshahi</option>
    <option value="Kandhkot">Kandhkot</option>
    <option value="Kandiaro">Kandiaro</option>
    <option value="Karachi">Karachi</option>
    <option value="Kashmore">Kashmore</option>
    <option value="Keti Bandar">Keti Bandar</option>
    <option value="Khairpur">Khairpur</option>
    <option value="Kotri">Kotri</option>
    <option value="Larkana">Larkana</option>
    <option value="Matiari">Matiari</option>
    <option value="Mehar">Mehar</option>
    <option value="Mirpur Khas">Mirpur Khas</option>
    <option value="Mithani">Mithani</option>
    <option value="Mithi">Mithi</option>
    <option value="Mehrabpur">Mehrabpur</option>
    <option value="Moro">Moro</option>
    <option value="Nagarparkar">Nagarparkar</option>
    <option value="Naudero">Naudero</option>
    <option value="Naushahro Feroze">Naushahro Feroze</option>
    <option value="Naushara">Naushara</option>
    <option value="Nawabshah">Nawabshah</option>
    <option value="Nazimabad">Nazimabad</option>
    <option value="Qambar">Qambar</option>
    <option value="Qasimabad">Qasimabad</option>
    <option value="Ranipur">Ranipur</option>
    <option value="Ratodero">Ratodero</option>
    <option value="Rohri">Rohri</option>
    <option value="Sakrand">Sakrand</option>
    <option value="Sanghar">Sanghar</option>
    <option value="Shahbandar">Shahbandar</option>
    <option value="Shahdadkot">Shahdadkot</option>
    <option value="Shahdadpur">Shahdadpur</option>
    <option value="Shahpur Chakar">Shahpur Chakar</option>
    <option value="Shikarpaur">Shikarpaur</option>
    <option value="Sukkur">Sukkur</option>
    <option value="Tangwani">Tangwani</option>
    <option value="Tando Adam Khan">Tando Adam Khan</option>
    <option value="Tando Allahyar">Tando Allahyar</option>
    <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
    <option value="Thatta">Thatta</option>
    <option value="Umerkot">Umerkot</option>
    <option value="Warah">Warah</option>
    <option value="" disabled>Khyber Cities</option>
    <option value="Abbottabad">Abbottabad</option>
    <option value="Adezai">Adezai</option>
    <option value="Alpuri">Alpuri</option>
    <option value="Akora Khattak">Akora Khattak</option>
    <option value="Ayubia">Ayubia</option>
    <option value="Banda Daud Shah">Banda Daud Shah</option>
    <option value="Bannu">Bannu</option>
    <option value="Batkhela">Batkhela</option>
    <option value="Battagram">Battagram</option>
    <option value="Birote">Birote</option>
    <option value="Chakdara">Chakdara</option>
    <option value="Charsadda">Charsadda</option>
    <option value="Chitral">Chitral</option>
    <option value="Daggar">Daggar</option>
    <option value="Dargai">Dargai</option>
    <option value="Darya Khan">Darya Khan</option>
    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
    <option value="Doaba">Doaba</option>
    <option value="Dir">Dir</option>
    <option value="Drosh">Drosh</option>
    <option value="Hangu">Hangu</option>
    <option value="Haripur">Haripur</option>
    <option value="Karak">Karak</option>
    <option value="Kohat">Kohat</option>
    <option value="Kulachi">Kulachi</option>
    <option value="Lakki Marwat">Lakki Marwat</option>
    <option value="Latamber">Latamber</option>
    <option value="Madyan">Madyan</option>
    <option value="Mansehra">Mansehra</option>
    <option value="Mardan">Mardan</option>
    <option value="Mastuj">Mastuj</option>
    <option value="Mingora">Mingora</option>
    <option value="Nowshera">Nowshera</option>
    <option value="Paharpur">Paharpur</option>
    <option value="Pabbi">Pabbi</option>
    <option value="Peshawar">Peshawar</option>
    <option value="Saidu Sharif">Saidu Sharif</option>
    <option value="Shorkot">Shorkot</option>
    <option value="Shewa Adda">Shewa Adda</option>
    <option value="Swabi">Swabi</option>
    <option value="Swat">Swat</option>
    <option value="Tangi">Tangi</option>
    <option value="Tank">Tank</option>
    <option value="Thall">Thall</option>
    <option value="Timergara">Timergara</option>
    <option value="Tordher">Tordher</option>
    <option value="" disabled>Balochistan Cities</option>
    <option value="Awaran">Awaran</option>
    <option value="Barkhan">Barkhan</option>
    <option value="Chagai">Chagai</option>
    <option value="Dera Bugti">Dera Bugti</option>
    <option value="Gwadar">Gwadar</option>
    <option value="Harnai">Harnai</option>
    <option value="Jafarabad">Jafarabad</option>
    <option value="Jhal Magsi">Jhal Magsi</option>
    <option value="Kacchi">Kacchi</option>
    <option value="Kalat">Kalat</option>
    <option value="Kech">Kech</option>
    <option value="Kharan">Kharan</option>
    <option value="Khuzdar">Khuzdar</option>
    <option value="Killa Abdullah">Killa Abdullah</option>
    <option value="Killa Saifullah">Killa Saifullah</option>
    <option value="Kohlu">Kohlu</option>
    <option value="Lasbela">Lasbela</option>
    <option value="Lehri">Lehri</option>
    <option value="Loralai">Loralai</option>
    <option value="Mastung">Mastung</option>
    <option value="Musakhel">Musakhel</option>
    <option value="Nasirabad">Nasirabad</option>
    <option value="Nushki">Nushki</option>
    <option value="Panjgur">Panjgur</option>
    <option value="Pishin Valley">Pishin Valley</option>
    <option value="Quetta">Quetta</option>
    <option value="Sherani">Sherani</option>
    <option value="Sibi">Sibi</option>
    <option value="Sohbatpur">Sohbatpur</option>
    <option value="Washuk">Washuk</option>
    <option value="Zhob">Zhob</option>
    <option value="Ziarat">Ziarat</option>

  </select>
      </div>
      <div className="col-3">
     
      {/* selected={departureDate} onChange={(date) => setDepartureDate(date)} */}
<DatePicker   selected={departureDate_s} onChange={(date) => setDepartureDate(date)}  className="custom-select custom-date"  />

      </div>

      <div className="col-3">
      <button type="submit" className="btn btn-primary btn-lg searchBtn">Search</button>

      </div>
    
    </div>
    
    </form>



      <div className=" ml-5 mr-5 row row-f ">
      

     
 
      <aside className="col-md-3 p-1    aside-filter ">
                  
            
                  <div className=" color-white shadow-md rounded py-2  px-2">
                    <div className='filer-header-text h3'><span >Filter</span></div>
               <article className=" filter-group ">
                   <header className="card-header color-white bg-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" className="collapsed ">
                       <h5 className='text-dark category-name '>Bus Type&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
            
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside1" >
                       <div className="ml-3 card-body  border-bottom ">
                       <ul className="list-menu ">
                        <li className="custom-control custom-checkbox">
                            <Link
                            className={'all' === category ? 'font-weight-bolder' : ''}
                            to={getFilterUrl({ category: 'all' })}
                          >
                             Any
                          </Link>
                          </li>
                       


                          
                           {categories && categories.map((c) => (
                          <li className="custom-control custom-checkbox">
                            <Link key={c}
                              className={c === category ? 'font-weight-bolder' : ''}
                              to={getFilterUrl({ category: c })}
                            >
                              {c}
                            </Link>
                            </li>
                        ))}
                              
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header bg-white color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside2" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Price&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside2" >
                       <div className="ml-3 card-body  border-bottom ">
                          
   

                           <ul className="list-menu ">
                           {prices.map((p) => (
                          <li className="custom-control custom-checkbox">
                            <Link key={p.name}
                             to={getFilterUrl({ min: p.min, max: p.max })}
                             className={
                              `${p.min}-${p.max}` === `${min}-${max}` ? 'font-weight-bolder' : ''
                            }
                            >
                            {p.name}
                            </Link>
                            </li>
                        ))}
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header bg-white color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside3" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Bus Company&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside3" >
                       <div className="ml-3 card-body  border-bottom ">
                          
                           <ul className="list-menu ">
                               {/* <li><a href="#" data-abc="true">Electronics </a></li>
                               <li><a href="#" data-abc="true">Watches  </a></li>
                               <li><a href="#" data-abc="true">Laptops </a></li>
                               <li><a href="#" data-abc="true">Clothes </a></li>
                               <li><a href="#" data-abc="true">Accessories </a></li> */}
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header bg-white color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside4" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Reviews&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside4" >
                       <div className="ml-3 card-body  border-bottom ">
                      
       
                           <ul className="list-menu">
                           {ratings.map((r) => (
          <li key={r.name}>
            <Link
              to={getFilterUrl({ rating: r.rating })}
              className={`${r.rating}` === `${rating}` ? 'font-weight-bolder' : ''}
            >
              <Ratting caption={' & up'} rating={r.rating}></Ratting>
            </Link>
          </li>
        ))}
                           </ul>
           
                       </div> 
                   </div>
               </article>
           </div>
           
           </aside>
                      
                




        
        {/* <div className="col-3">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Ratting caption={' & up'} rating={r.rating}></Ratting>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div> */}




<div className="col-md-9 ">
<div className=" ">
{loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
         

<div className="color-white p-2 mt-1 rounded ml-2">
<div className="font-weight-bold d-inline  "> {buses.length} Buses Found </div>
<div className='d-inline searchBar '> <label
                            for="input-sort"
                            className="text-muted col-form-label-sm  text-right  text-900  "
                            >Sort By: &nbsp;
                              </label>
                              <select
                            className="border custom-select  col-3 "       
                            value={order}
                            onChange={(e) => {
                              navigate(getFilterUrl({ order: e.target.value }));
                            }}
                          >
            {/* <option value="newest">Newest Arrivals</option> */}
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
                          </select>
</div></div> 

       

          )}

              






<div className="bus-list  mt-4  ">



  








    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <>
    {buses.length === 0 && (
          <MessageBox>No Bus Found</MessageBox>
        )}
        <div >
          {buses.map((bus) => (
//             <div class="card mt-3"  key = {bus._id}>
//   <h5 class="card-header">{bus.seller.seller.name}</h5>
//   <div class="card-body">
//   <div className="col-6 timeline border-left ml-5">
//               <div className="text-1 timeline-circle  row">
//                 <div className="font-weight-bold d-block ml-3 ml-3 mb-4 col-12 for-font text-capitalize">
//                   {bus.from}
//                 </div>
//                 <div></div>
//                 {/* <div
//                   title="Bund Road Lahore"
//                   className="col-8 text-truncate for-font"
//                 >
//                   Bund Road Lahore..
//                 </div> */}
//                 {/* <div className="col-4 for-font">
//                   <a
//                     href="https://www.google.com/maps/search/?api=1&amp;query=31.5335122,74.2826173"
//                     target="_blank"
//                     title="Google map"
//                     className="text-3 ml-1 ml-sm-2"
//                     ><i
//                       className="fas fa-map-marker-alt text-primary"
//                     ></i
//                   ></a>
//                 </div> */}
//               </div>
//               <div className="text-1 timeline-circle row">
//                 <div className="font-weight-bold d-block ml-3 col-12 for-font text-capitalize">
//                   {bus.to}
//                 </div>
//                 {/* <div
//                   title="Kainat Trravels &amp; Kohistan Express, Peshawar road"
//                   className="col-8 text-truncate for-font"
//                 >
//                   Kainat Trravels &amp; Kohistan Express,
//                   Peshawar road..
//                 </div> */}
//                 {/* <div className="col-4">
//                   <a
//                     href="https://www.google.com/maps/search/?api=1&amp;query=33.6134572,72.9966181"
//                     target="_blank"
//                     title="Google map"
//                     className="text-3 ml-1 ml-sm-2"
//                     ><i
//                       className="fas fa-map-marker-alt text-primary"
//                     ></i
//                   ></a>
//                 </div> */}
//               </div>
//             </div>


//         <div className="mt-2">
//             <div className="row no-gutters">
//               <div className="col-auto text-1">
//                 <span className="text-muted for-font">Type: </span>
//                 <span className="font-weight-bold for-font">{bus.bus_type}</span>
//               </div>
//               <div className="col-auto pl-2 text-1">
//                 <span className="text-muted for-font">Seats Left: </span>
//                 <span className="font-weight-bold for-font">{bus.seats_remaining}</span>
//               </div>
//               <div className="col-auto pl-2 text-1">
//                 <span className="text-muted for-font">Rating: </span>
//                 <span className="font-weight-bold   for-font"
//                   ><i className="fas fa-star text-warning"></i>
//                  {bus.rating} </span
//                 >
//               </div>
//             </div>
//           </div>


//     {/* <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
<>

{/* <div class="container mt-5 mb-5"> */}
    {/* <div class="d-flex justify-content-center row"> */}
        <div class="col-md-2 mt-4"  key = {bus._id}>
            <div class="row  bg-white border rounded p-2 busCard">
                <div class="col-md-2"><img class="img-fluid img-responsive rounded product-image" src="data:image/jpeg;base64,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"/>
                <span className='font-weight-bold ml-3'>{bus.departureDate}</span>
                </div>
                <div class="col-md-3 mt-1">
                    <h5>{bus.seller.seller.name}</h5>
                    <div className="col-auto  text-1">
                <span className="text-muted for-font">Rating:  &nbsp; </span>
                <span className="font-weight-bold   for-font"
                  ><i className="fas fa-star text-warning"></i>
                 {bus.rating} </span
                >
              </div>
              <div className="col-md-10 text-1">
                <span className="text-muted for-font">Seats Left: </span>
                <span className="font-weight-bold for-font">{bus.seats_remaining}</span>
              </div>
              <div className="col-auto text-1">
                <span className="text-muted for-font">Type: &nbsp;  &nbsp;  &nbsp;  &nbsp;  </span>
                <span className="font-weight-bold for-font">{bus.bus_type}</span>
              </div>
                    <div className="mt-2">
 
          </div>
                    {/* <div class="mt-1 mb-1 spec-1"><span>100% cotton</span><span class="dot"></span><span>Light weight</span><span class="dot"></span><span>Best finish<br/></span></div>
                    <div class="mt-1 mb-1 spec-1"><span>Unique design</span><span class="dot"></span><span>For men</span><span class="dot"></span><span>Casual<br/></span></div>
                    <p class="text-justify text-truncate para mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.<br/><br/></p> */}
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                    <span className="text-muted for-font">From:&nbsp;&nbsp; </span>
                <span className="font-weight-bold for-font text-capitalize">{bus.from}</span>
                    </div>
                    <br/><br/>
                    <div class="d-flex flex-row align-items-center">
                    <span className="text-muted for-font">To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="font-weight-bold for-font text-capitalize">{bus.to}</span>
                    </div>
                </div> 

                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h5 class="mr-1"> {bus.price}.0 PKR</h5>
                    </div>
                    {/* <h6 class="text-success">Free shipping</h6> */}
                    <div class="d-flex flex-column mt-4">
                                  <button
                  type="submit"
                  className="btn btn btn-primary btn-sm"
                  onClick={()=>navigate(`/bus/${bus._id}`)}
                >
                  BOOK
                </button>
                      </div>
                </div>             
 

                
            </div>
     
   
    </div>
{/* </div>
</div> */}
</>
))}


</div>









    </>
    )}
  












</div>
</div>
</div>

      </div>
    </div>
  );
}







