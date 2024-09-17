import { View, DimensionValue } from 'react-native';
import React from 'react';
import SkeletonItem from './SkeletonItem';
import { isOdd } from '../../helpers/table_utils';

interface SkeletonRowTableProps {
  width: DimensionValue;
  color: string;
  indexRow: number;
  indexColumn: number;
  widthSkeleton?: DimensionValue;
}

const SkeletonRowTable: React.FC<SkeletonRowTableProps> = ({
  width,
  color,
  indexRow,
  indexColumn,
  widthSkeleton,
}) => {
  return (
    <View
      style={{
        width,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: indexColumn == 1 ? 36 : 0,
      }}>
      <SkeletonItem
        animationSpeed={900 * (isOdd(indexRow) ? 2 : 1.5)}
        borderRadius={25}
        color={color}
        delay={10}
        height={25}
        width={
          widthSkeleton
            ? widthSkeleton
            : indexColumn === 1 && isOdd(indexRow)
            ? '80%'
            : '60%'
        }
      />
    </View>
  );
};

export default SkeletonRowTable;
