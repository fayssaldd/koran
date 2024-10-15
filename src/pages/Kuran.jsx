import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Input } from "@/components/ui/input"
import ReactPlayer from 'react-player'
import './style.css'
import { AudioLines } from 'lucide-react'

export default function Kuran() {
        // 9ora2
        const [reciters, setReciters] = useState([])
        // Reaway
        const [rewayaSelect, setRewayaSelect] = useState(null)
        // tafasil l9ari2
        const [reciterDetail, setReciterDetail] = useState(null)
        // sowar l9ari2
        const [surasReciter,setSurasReciter] = useState(null)
        const [surasForKarie,setSurasForKarie] = useState(null)
        // sowar
        const [chapters, setChapters] = useState([])
        // surah player
        const [surahPlayer, setSurahPlayer] = useState(null)
        const  surasArray = surasReciter?.split(',').map(Number);
        const filteredSuras = chapters.filter(surah => surasArray?.includes(surah.id))
        const [surahSearch,setSurahSeachre] = useState(null)
        const fetchDataReciters = async ()=>{
            await axios.get('https://mp3quran.net/api/_arabic.php')
            .then(({data})=>{
                setReciters(data.reciters);       
            })
        }
        const fetchDataChapters = async ()=>{
            await axios.get('https://api.quran.com/api/v4/chapters')
            .then(({data})=>{
                setChapters(data.chapters);                   
            })
        }
        useEffect(()=>{
            fetchDataReciters()
            fetchDataChapters()
        },[])

        // Update only the id in the surahPlayer object
        const handleEnd = () => {
            // Increment surahPlayer.id by 1, or reset to 1 if it exceeds 112
            const newId = surahPlayer.id < 114 ? surahPlayer.id + 1 : 1;
            const nexSurah = filteredSuras.filter(sr=>sr.id == newId).map(s=>(s))            
            // Update only the id in the surahPlayer object
            setSurahPlayer(...nexSurah);
        };
        const uniqueRewayas = [...new Set(reciters.map(reciter => reciter.rewaya))];
        const recitersWithReways = rewayaSelect && reciters.filter(rc=>rc.rewaya == rewayaSelect )
  return (
    <div dir='rtl' className='p-10 lg:flex mt-12 h-[90vh]'>
            <div className='lg:w-1/5 max-sm:w-full lg:ml-8 lg:shadow-xl lg:border lg:p-4'>
                <div className='flex flex-col max-sm:flex-col'>
                    <div className='mb-4 m-1  max-sm:w-full'>
                        <label className='mb-4 block'>حدد الرواية</label>
                        <Select onValueChange={(value)=>{
                            setRewayaSelect(value)}}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="حدد الرواية" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    uniqueRewayas?.map((rw,key)=>(
                                        <SelectItem key={key} value={rw}>{rw}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='mb-4 m-1 max-sm:w-full'>
                        <label className='mb-4 block'>حدد القارئ </label>
                        <Select onValueChange={(value)=>{
                            setSurasReciter(value.suras)
                            setReciterDetail(value)}}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="حدد القارء" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    recitersWithReways?.map((rc,key)=>(
                                        <SelectItem key={key} value={rc}>{rc.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='mb-8'>
                    <p className='flex max-sm:flex-col flex-col items-start justify-start'>
                        <span className='max-sm:mx-0 mb-4'>
                            <b className='underline'>القارء الحالي : </b>
                            {reciterDetail?.name}
                        </span>
                        <span className='max-sm:mb-4'>
                            <b  className='underline' >السورة الحالية : </b> 
                            {surahPlayer?.name_arabic}
                        </span>
                        
                    </p>
                    <p className='w-full mt-4' >
                            <Input  onChange={(e)=>{
                                        // console.log(e.target.value);
                                        
                                        setSurahSeachre(filteredSuras?.filter(sr=>sr.name_arabic.includes(e.target.value)))
                                    }} 
                                    className={'w-full'}
                                type="text" placeholder="بحث عن سورة"
                            />
                    </p>
            
                </div>
            </div>
          
            <div className='lg:w-4/5 lg:max-h-[80vh] lg:rounded-2xl lg:bg-gray-100 lg:p-5 dark:bg-gray-700'>
            <div className='
                    os-viewport os-viewport-native-scrollbars-invisible
                    flex 
                    h-full
                     items-center justify-center w-full flex-wrap
                     lg:overflow-y-scroll 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                    '
            >
                {
                filteredSuras.length == 0 ? <p className='text-center mb-4'>
                                                قم بتحديد الرواية و القارئ أولا
                                            </p> : <>
                
                {
                     surahSearch === null ? filteredSuras?.map((sr)=>
                        <div
                            key={sr.id}
                            onClick={()=>setSurahPlayer(sr)}
                            className={`m-2 border text-center shadow p-4 rounded-xl max-sm:w-28 w-32
                                       hover:cursor-pointer hover:bg-yellow-500
                                       hover:scale-x-105 hover:text-white  
                                       bg-white
                                       dark:bg-gray-800
                                       ${surahPlayer?.id == sr.id && '!bg-yellow-500 text-white'}  
                            `}
                        >
                           <p className='underline khatArabie'>
                            <b className='ml-3'>{sr.id}</b>
                            {sr.name_arabic}
                           </p>
                           <p>
                            أياتها {sr.verses_count} 
                            
                           </p>
                           {
                            surahPlayer?.id == sr.id &&
                                <p className="flex justify-center items-center audio-lines-icon">
                            <AudioLines />
                            </p>
                           }
                           
                            
                        </div>
                    )  : <>
                    {
                        surahSearch?.map((sr)=>
                            <div
                                key={sr.id}
                                onClick={()=>setSurahPlayer(sr)}
                                className={`m-2 border text-center shadow p-4 rounded-xl max-sm:w-28 w-32
                                       hover:cursor-pointer hover:bg-yellow-500
                                       hover:scale-x-105 hover:text-white  
                                       bg-white
                                       dark:bg-gray-800
                                       ${surahPlayer?.id == sr.id && '!bg-yellow-500 text-white'} 
                                `}
                            >
                               <p className='underline khatArabie'>
                                <b className='ml-3'>{sr.id}</b>
                                {sr.name_arabic}
                               </p>
                               <p>
                                أياتها {sr.verses_count} 
                                
                               </p>
                               {
                                surahPlayer?.id == sr.id &&
                                    <p className="flex justify-center items-center audio-lines-icon">
                                <AudioLines />
                                </p>
                               }
                               
                                
                            </div>)
                    }
                    </>
                }
                </>
                }
                
                
            </div>
            </div>
            <div>
             {/* url='http://server8.mp3quran.net/ahmad_huth/002.mp3' */}
             {
                reciterDetail && surahPlayer &&(
                    <ReactPlayer

                        url={`${reciterDetail.Server}/${('00'+surahPlayer.id).slice(-3)}.mp3`}
                        controls={true}
                        playing={true}
                        onEnded={handleEnd}
                        // loop={true}
                        width='100%'
                        className={"fixed bottom-0 right-0"}
                        height='60px'
                    />
                )
             }
             
            </div>
        </div>
  )
}
