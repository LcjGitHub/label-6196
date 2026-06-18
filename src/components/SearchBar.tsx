import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Input
        allowClear
        placeholder="搜索作品名称、产地或寓意…"
        prefix={<SearchOutlined className={styles.prefixIcon} />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClear={onClear}
        className={styles.input}
      />
    </div>
  );
}
