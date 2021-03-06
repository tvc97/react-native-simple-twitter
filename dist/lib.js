export const decodeHTMLEntities = (text) => {
    const entities = {
        amp: '&',
        apos: '\'',
        '#x27': '\'',
        '#x2F': '/',
        '#39': '\'',
        '#47': '/',
        lt: '<',
        gt: '>',
        nbsp: ' ',
        quot: '"',
    };
    return text.replace(/&([^;]+);/gm, (match, entity) => entities[entity] || match);
};
export const getRelativeTime = (dateTime) => {
    const created = new Date(dateTime);
    const diff = Math.floor((new Date().getTime() - created.getTime()) / 1000);
    if (diff < 60) {
        return `${diff}s`;
    }
    if (diff < 3600) {
        return `${Math.floor(diff / 60)}m`;
    }
    if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h`;
    }
    return `${created.getFullYear()}/${(`00${created.getMonth() + 1}`).slice(-2)}/${(`00${created.getDate()}`).slice(-2)}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLElBQVksRUFBVSxFQUFFO0lBQ3pELE1BQU0sUUFBUSxHQUFRO1FBQ3BCLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxHQUFHO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsR0FBRztRQUNWLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxHQUFHO0tBQ1YsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFDO0FBS0YsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBZ0MsRUFBVSxFQUFFO0lBQzFFLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTNFLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtRQUNiLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQztLQUNuQjtJQUVELElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtRQUNmLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFO1FBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ3RDO0lBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN6SCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRlY29kZSBodG1sIGVudGl0eVxuICovXG5leHBvcnQgY29uc3QgZGVjb2RlSFRNTEVudGl0aWVzID0gKHRleHQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGVudGl0aWVzOiBhbnkgPSB7XG4gICAgYW1wOiAnJicsXG4gICAgYXBvczogJ1xcJycsXG4gICAgJyN4MjcnOiAnXFwnJyxcbiAgICAnI3gyRic6ICcvJyxcbiAgICAnIzM5JzogJ1xcJycsXG4gICAgJyM0Nyc6ICcvJyxcbiAgICBsdDogJzwnLFxuICAgIGd0OiAnPicsXG4gICAgbmJzcDogJyAnLFxuICAgIHF1b3Q6ICdcIicsXG4gIH07XG5cbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJihbXjtdKyk7L2dtLCAobWF0Y2gsIGVudGl0eSkgPT4gZW50aXRpZXNbZW50aXR5XSB8fCBtYXRjaCk7XG59O1xuXG4vKipcbiAqIGdldCByZWxhdGl2ZSB0aW1lXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGl2ZVRpbWUgPSAoZGF0ZVRpbWU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjcmVhdGVkID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICBjb25zdCBkaWZmID0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjcmVhdGVkLmdldFRpbWUoKSkgLyAxMDAwKTtcblxuICBpZiAoZGlmZiA8IDYwKSB7XG4gICAgcmV0dXJuIGAke2RpZmZ9c2A7XG4gIH1cblxuICBpZiAoZGlmZiA8IDM2MDApIHtcbiAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkaWZmIC8gNjApfW1gO1xuICB9XG5cbiAgaWYgKGRpZmYgPCA4NjQwMCkge1xuICAgIHJldHVybiBgJHtNYXRoLmZsb29yKGRpZmYgLyAzNjAwKX1oYDtcbiAgfVxuXG4gIHJldHVybiBgJHtjcmVhdGVkLmdldEZ1bGxZZWFyKCl9LyR7KGAwMCR7Y3JlYXRlZC5nZXRNb250aCgpICsgMX1gKS5zbGljZSgtMil9LyR7KGAwMCR7Y3JlYXRlZC5nZXREYXRlKCl9YCkuc2xpY2UoLTIpfWA7XG59O1xuIl19