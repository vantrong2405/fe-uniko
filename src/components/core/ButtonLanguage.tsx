import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { locales } from '@/libraries/i18n'
import { motion } from 'framer-motion'
import vietnamLanguage from '@/images/vietnam.png'
import Image from 'next/image'

export default function ButtonLanguage() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const changeLanguage = (languageCode: 'en' | 'vi') => i18n.changeLanguage(languageCode)

  return (
    <Button variant='ghost' size='icon' className='relative rounded-full'>
      <motion.div
        key='english-icon'
        initial={{ opacity: 1, rotate: 0, scale: 1 }}
        animate={{
          opacity: currentLanguage === 'en' ? 1 : 0,
          rotate: currentLanguage === 'en' ? 0 : 90,
          scale: currentLanguage === 'en' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        onClick={() => changeLanguage('vi')}
      >
        <Image
          src={'https://www.flaticon.com/media/dist/min/img/flags/en.svg'}
          className='object-cover'
          alt=''
          width={'25'}
          height={'25'}
        />
      </motion.div>

      <motion.div
        key='vietnam-icon'
        initial={{ opacity: 0, rotate: 90, scale: 0 }}
        animate={{
          opacity: currentLanguage === 'vi' ? 1 : 0,
          rotate: currentLanguage === 'vi' ? 0 : 90,
          scale: currentLanguage === 'vi' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className='absolute'
        onClick={() => changeLanguage('en')}
      >
        <Image src={vietnamLanguage} className='object-cover' alt='' width={'25'} height={'25'} />
      </motion.div>
      <span className='sr-only'>Toggle language</span>
    </Button>
  )
}
