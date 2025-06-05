import { SvgSpinnnersBarsScale } from '../spinners/svg-spinners--bars-scale';

import { RequestStatus } from '@/core/types/RequestStatus.type';

interface TrDefaultProps {
  total: number;
  columns: number;
  requestStatus: RequestStatus;
}

export const TrDefault = ({
  total = 0,
  columns = 1,
  requestStatus = 'init',
}: TrDefaultProps) => {
  if (requestStatus === 'loading') {
    return (
      <tr>
        <td colSpan={columns + 1} className='text-center'>
          <SvgSpinnnersBarsScale className='text-primary mx-auto size-12' />
        </td>
      </tr>
    );
  }

  if (total === 0 && requestStatus === 'success') {
    return (
      <tr>
        <td colSpan={columns + 1} className='text-center'>
          No trainings found
        </td>
      </tr>
    );
  }

  if (requestStatus === 'failed') {
    return (
      <tr>
        <td colSpan={columns + 1} className='text-center text-red'>
          Error fetching Data
        </td>
      </tr>
    );
  }
};
