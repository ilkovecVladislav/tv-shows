import * as stylex from '@stylexjs/stylex';
import ShowCard from './ShowCard';
import { styles } from './stylex';
import type { ShowListProps } from './types';
import { usePresenter } from './usePresenter';

function ShowList(props: ShowListProps) {
  const presenter = usePresenter(props);

  return (
    <ul {...stylex.props(styles.grid)}>
      {presenter.shows.map((show) => (
        <li key={show.id} {...stylex.props(styles.item)}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  );
}

export default ShowList;
