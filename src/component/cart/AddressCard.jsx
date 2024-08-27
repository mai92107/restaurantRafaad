import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Card } from '@mui/material';
import {Button} from '@mui/material';

const AddressCard = ({item, showButtom, handleSelectAddress }) => {

    return (
      <Card className="flex gap-5 w-64 p-5">
          <HomeIcon />
          <div className='space-y-3 text-gray-50'>
              <h1 className='font-semibold text-lg text-white'>Home</h1>
              <p>
                  13F, No.65, St.Tongbei, District Zhongsan, Taipei, Taiwan
              </p>
              { showButtom && <Button variant="outlined" fullWidth onClick={()=>handleSelectAddress(item)}>select</Button>}
          </div>
    </Card>
  )
}

export default AddressCard