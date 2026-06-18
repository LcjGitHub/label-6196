import { Input } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
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
 * - 支持按作品名称、寓意文字实时过滤
 * - 提供带无障碍标签的清空按钮
 */
export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <SearchOutlined className={styles.prefixIcon} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索作品名称或寓意文字…"
          className={styles.input}
          aria-label="搜索年画关键词"
          bordered={false}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className={styles.clearBtn}
            aria-label="清空搜索关键词"
            title="清空搜索关键词"
          >
            <CloseCircleFilled />
          </button>
        )}
      </div>
    </div>
  );
}
