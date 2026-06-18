import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar.module.css';

/**
 * 搜索栏组件 Props
 */
interface SearchBarProps {
  /** 当前输入的关键词值 */
  value: string;
  /** 关键词变化回调，输入变更时实时触发 */
  onChange: (value: string) => void;
  /** 清空按钮点击回调 */
  onClear: () => void;
}

/**
 * 关键词搜索栏
 * - 位于首页题材 Tab 下方
 * - 支持按作品名称、产地、寓意实时过滤
 * - 提供带无障碍标签的清空按钮
 */
export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Input
        allowClear={{
          clearIcon: <span aria-label="清空搜索关键词">×</span>,
        }}
        placeholder="搜索作品名称、产地或寓意…"
        prefix={<SearchOutlined className={styles.prefixIcon} />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClear={onClear}
        className={styles.input}
        aria-label="搜索年画关键词"
      />
    </div>
  );
}
