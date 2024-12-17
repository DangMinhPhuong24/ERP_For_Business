// @ts-nocheck
import { formatNumber } from 'common/common'
import colors from './colors'

export const optionHorizontalBar = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (val) => {
          return (val.dataset.label ? val.dataset.label + ': ' : '') + formatNumber(val.parsed.x) + '%'
        }
      }
    },
    legend: {
      display: false
    },
    title: {
      display: true,
      text: '% (Mét vuông)',
      align: 'end'
    }
  },
  scales: {
    x: {
      display: true,
      beginAtZero: true,
      stacked: true,
      grid: {
        color: colors.textChartGreenColor
      },
      border: {
        dash: [8, 4]
      },
      ticks: {
        display: false,
        stepSize: 25
      },
      max: 100,
      categorySpacing: 2
    },
    y: {
      display: true,
      beginAtZero: true,
      stacked: true,
      grid: {
        color: colors.textChartGreenColor
      },
      border: {
        dash: [8, 4]
      }
    }
  }
}

export const settingSlick = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
}

export const optionBar = (
  t,
  titleLegend,
  setIndexElementChart,
  setSortBy,
  setCurrentPage,
  dataMeterOfLongestInventories = []
) => {
  return {
    onClick: function (e, element) {
      if (element.length > 0) {
        setIndexElementChart(element[0].index)
        setSortBy(titleLegend.sortBy)
        setCurrentPage(1)
      }
    },
    onHover: (event, chartElement) => {
      if (chartElement.length == 1) {
        event.native.target.style.cursor = 'pointer'
      } else if (chartElement.length == 0) {
        event.native.target.style.cursor = 'default'
      }
    },
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (val) => {
            if (titleLegend.sortBy == 1) {
              return formatNumber(val.parsed.y) + ' m2'
            } else {
              return `${formatNumber(val.parsed.y)} ${titleLegend.y}`
            }
          },
          afterLabel: (val) => {
            if (titleLegend.sortBy !== 1) {
              return `${formatNumber(dataMeterOfLongestInventories[val.dataIndex])} m2`
            }
          }
        }
      },
      chartAreaBorder: {
        borderColor: colors.blackColor
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: titleLegend.main,
        align: 'start',
        color: colors.blackColor
      },
      datalabels: {
        display: true,
        color: colors.textChartBlueColor
      }
    },
    scales: {
      x: {
        display: true,
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          color: colors.blackColor
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          display: false
        },
        title: {
          display: true,
          text: titleLegend.y,
          color: colors.blackColor
        }
      }
    }
  }
}
