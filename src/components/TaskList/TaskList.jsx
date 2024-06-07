import { Task } from "../Task/Task";
import { statusFilters } from "../../redux/constants";
import css from "./TaskList.module.css";
import { useSelector } from "react-redux";
import { getTasks } from "../../redux/selectors";

const getVisibleTasks = (tasks, StatusFilter) => {
  switch (StatusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  const tasks = useSelector(getTasks);
  const statusFilter = useSelector((state) => state.filters.status);
  const visibleTasks = getVisibleTasks(tasks, statusFilter);
  return (
    <ul className={css.list}>
      {visibleTasks.map((task) => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
